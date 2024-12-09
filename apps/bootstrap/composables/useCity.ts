import cityCountyData from '../assets/CityCountyData.json'

export type CountyOption = {
  ZipCode: string;
  AreaName: string;
  AreaEngName: string;
}

export function useCity() {
  const cities = computed(() => cityCountyData.map((item) => ({
    CityName: item.CityName,
    CityEngName: item.CityEngName
  })))

  const counties = computed<(city: string) => CountyOption[]>(() => (city: string) => {
    const data = cityCountyData.find((item) => item.CityName === city)
    if (data) return data.AreaList
    return []
  })

  return {
    cities,
    counties
  }
}