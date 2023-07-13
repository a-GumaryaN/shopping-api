type validator_proxy<T> = (_: T) => { error: any; value: T };

export default validator_proxy;
