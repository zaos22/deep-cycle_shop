<button {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex items-center px-4 py-2 bg-white-800 colorbg2 border border-transparent rounded-md font-semibold text-xs  text-blackhite  text black-800 uppercase tracking-widest hover:bg-white-700  hover:bg-white focus:bg-white-700  focus:bg-white active:bg-white-900  active:bg-white-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-gray-800 transition ease-in-out duration-150']) }}>
    {{ $slot }}
</button>
