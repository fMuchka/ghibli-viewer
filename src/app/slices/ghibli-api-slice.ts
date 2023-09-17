import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Vehicles {
    id: string;
    name: string;
    description: string;
    vehicle_class: string;
    length: string;
    pilot: string;
    films: string[];
    url: string;
}

interface Species {
    id: string;
    name: string;
    classification: string;
    eye_colors: string;
    hair_colors: string;
    people: string[];
    films: string[];
    url: string;
}

interface Locations {
    id: string;
    name: string;
    climate: string;
    terrain: string;
    surface_water: string;
    residents: string[];
    films: string[];
    url: string;
}

interface People {
    id: string;
    name: string;
    gender: string;
    age: string;
    eye_color: string;
    hair_color: string;
    films: string[];
    species: string;
    url: string;
}

interface Films {
    id: string;
    title: string;
    original_title: string;
    original_title_romanised: string;
    image: string;
    movie_banner: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    running_time: string;
    rt_score: string;
    people: string[];
    species: string[];
    locations: string[];
    vehicles: string[];
    url: string;
}

export const ghibliApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ghibliapi.vercel.app/',
  }),

  endpoints(builder) {
    return {
        fetchFilms: builder.query<Films[], void>({
            query() {
                return `/films`;
            },
        }),

        fetchPeople: builder.query<People[], void>({
            query() {
            return `/people`;
            },
        }),

        fetchLocations: builder.query<Locations[], void>({
            query() {
            return `/locations`;
            },
        }),

        fetchSpecies: builder.query<Species[], void>({
            query() {
            return `/species`;
            },
        }),

        fetchVehicles: builder.query<Vehicles[], void>({
            query() {
            return `/vehicles`;
            },
        })
    };
  },
});

export const {
    useFetchFilmsQuery,
    useFetchPeopleQuery,
    useFetchLocationsQuery,
    useFetchSpeciesQuery,
    useFetchVehiclesQuery
} = ghibliApiSlice;