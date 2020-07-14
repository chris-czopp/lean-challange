export default name => `${Math.random().toString(36).substr(2, 9)}${window.btoa(name)}`
