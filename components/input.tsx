import { useRouter } from 'next/router';

const Input = ({ name, type = 'text', text, readOnly = false, value = '', onChange = null }) => {
  const router = useRouter();
  return (
    <label
      htmlFor={name}
      className='flex flex-row lg:self-end w-full   px-2 space-x-2  text-2xl text-gray-400'
    >
      <span className='flex w-1/3 '>{text}</span>
      <input
        type={type}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        //value={value}
        className='px-2 py-1  w-2/3  text-base font-medium bg-gray-400 rounded-lg text-gray-800  focus:outline-none  '
        name={name}
        readOnly={readOnly}
      />
    </label>
  );
};

export default Input;
