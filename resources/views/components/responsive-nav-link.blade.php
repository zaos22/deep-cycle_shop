@props(['active'])

@php
$classes = ($active ?? false)
            ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400  border-indigo-600 text-left text-base font-medium text-indigo-700  text-indigo-300 bg-indigo-50  bg-indigo-900/50 focus:outline-none focus:text-indigo-800  focus:text-indigo-200 focus:bg-indigo-100  focus:bg-indigo-900 focus:border-indigo-700  focus:border-indigo-300 transition duration-150 ease-in-out'
            : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text black-600  text black-400 hover:text black-800  hover:text black-200 hover:bg-white-50  hover:bg-white-700 hover:border-gray-300  hover:border-gray-600 focus:outline-none focus:text black-800  focus:text black-200 focus:bg-white-50  focus:bg-white-700 focus:border-gray-300  focus:border-gray-600 transition duration-150 ease-in-out';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
