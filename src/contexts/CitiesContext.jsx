import { createContext, useContext, useState, useEffect, useReducer, act } from 'react'

const CitiesContext = createContext()
const initialStete = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: '',
}

function reducer(state, action) {
    switch(action.type) {
        case 'loading':
            return { ...state, isLoading: true }
        case 'cities/loaded':
            return { ...state, isLoading: false, cities: action.payload };
        case 'city/created':
            return { ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload };
        case 'city/deleted':
            return { ...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload), currentCity: {} };
        case 'city/loaded':
            return { ...state, isLoading: false, currentCity: action.payload };
        case 'rejected': 
            return { ...state, isLoading: false, error: action.payload };
        default: throw new Error('failed')
    }
}

function CitiesProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialStete);
    const { cities, currentCity, isLoading } = state;


    useEffect(function() {
        async function citiesList() {
        try {
            dispatch({type: 'loading'})
            const res = await fetch('http://localhost:9000/cities')
            if(!res.ok) throw new Error('failed to fetch cities')
            const data = await res.json();
            dispatch({type: 'cities/loaded', payload: data})
        } catch (err) {
            dispatch({type: 'rejected', payload: err.message})
        }}
        citiesList();
    }, []);

    async function getCity(id) {
        try {
            dispatch({type: 'loading'})
            const res = await fetch(`http://localhost:9000/cities/${id}`)

            if(!res.ok) throw new Error('failed to fetch cities')

            const data = await res.json();
            dispatch({type: 'city/loaded', payload: data})
        } catch (err) {
            dispatch({type: 'rejected', payload: err.message})
        } 
    }

    async function createCity(newCtiy) {
        try {
            dispatch({type: 'loading'})
            const res = await fetch(`http://localhost:9000/cities`,{
                method: 'POST',
                body: JSON.stringify(newCtiy),
                headers: {
                    "Content-Type": "application/json"
                }
            } )

            if(!res.ok) throw new Error('there was an error creating the city')
            const data = await res.json();
            dispatch({type: 'city/created', payload: data})
        } catch (err) {
            dispatch({type: 'rejected', payload: err.message})
        }
    }

    async function deleteCity(id) {
        try {
            dispatch({type: 'loading'})
            await fetch(`http://localhost:9000/cities/${id}`,{
                method: 'DELETE',
            } )

            dispatch({type: 'city/deleted', payload: id})
        } catch {
            dispatch({type: 'rejected', payload: 'failed to delete city'})
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity,
        }}>
            { children }
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider')
    return context;
}

export { CitiesProvider, useCities }