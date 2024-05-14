export class NearEarthObject {
    links: Link[] 
    id: string
    neo_reference_id: string
    name: string
    name_limited: string
    designation: string
    nasa_jpl_url: string
    absolute_magnitude_h: number
    estimated_diameter: Diameter[]
    is_potentially_hazardous_asteroid: boolean
    close_approach_data: CloseApproach[]
    orbital_data: OrbitalData
    is_sentry_object: boolean
}

export class OrbitalData {
    orbit_id: string
    orbit_determination_date: string
    first_observation_date: string
    last_observation_date: string
    data_arc_in_days: number
    observations_used: number
    orbit_uncertainty: string
    minimum_orbit_intersection: string
    jupiter_tisserand_invariant: string
    epoch_osculation: string
    eccentricity: string
    semi_major_axis: string
    inclination: string
    ascending_node_longitude: string
    orbital_period: string
    perihelion_distance: string
    perihelion_argument: string
    aphelion_distance: string
    perihelion_time: string
    mean_anomaly: string
    mean_motion: string
    equinox: string
    orbit_class: OrbitClass
}

export class OrbitClass {
    orbit_class_type: string
    orbit_class_description: string
    orbit_class_range: string
}

export class Velocity {
    kilometers_per_second: string
    kilometers_per_hour: string
    miles_per_hour: string
}

export class MissDistance {
    astronomical: string
    lunar: string
    kilometers: string
    miles: string
}

export class CloseApproach {
    close_approach_date: string
    close_approach_date_full: string
    epoch_date_close_approach: number
    relative_velocity: Velocity
    miss_distance: MissDistance
    orbiting_body: string
}

export class Diameter {
    kilometers: DiameterRange
    meters: DiameterRange
    miles: DiameterRange
    feet: DiameterRange
}

export class DiameterRange {
    estimated_diameter_min: number
    estimated_diameter_max: number
}

export class Link {
    self: string;
}