type Props = {
  label: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  class?: string;
  value?: string | number;
};

export function FormInput(props: Props) {
  const className = props.class || "";
  const { label, name, type = "text", placeholder = "", value = "" } = props;

  return (
    <div class="mb-4">
      <label
        for={name}
        class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
      >
        {label}
      </label>

      <input
        type={type}
        id={"id_" + name}
        name={name}
        placeholder={placeholder}
        class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        value={value}
      />
    </div>
  );
}
