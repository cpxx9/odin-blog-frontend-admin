import useLocalStorage from './useLocalStorage';

const useInput = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e) => {
      e.target ? setValue(e.target.value) : setValue(String(e));
    },
  };

  return [value, reset, attributeObj];
};

export default useInput;
