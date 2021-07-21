export default function normalize (country) {
  return country.charAt(0).toUpperCase() + country.slice(1)
}
