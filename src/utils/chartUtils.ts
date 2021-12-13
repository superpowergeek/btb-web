import { VALUE_TOGGLE_OPTIONS } from '../views/Performance/const'

export const switchChart = (valueType: string, data: number[], length: number) => {
  return valueType === VALUE_TOGGLE_OPTIONS[0].value
    ? data
    : data.map((item) => (item * 100.0) / data.slice(0, length).reduce((total, num) => total + num, 0))
}
