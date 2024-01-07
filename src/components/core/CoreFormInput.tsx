type Props = {
  label: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  className?: string;
  value?: string | number;
};

export function CoreFormInput({
  label,
  name,
  type = "text",
  placeholder = "",
  className = "",
  value = "",
}: Props) {
  return (
    <div class="mb-4">
      <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
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
