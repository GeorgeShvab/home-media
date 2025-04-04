const getExtension = (name: string) => `.${name.split('.').at(-1)!}`

export default getExtension
