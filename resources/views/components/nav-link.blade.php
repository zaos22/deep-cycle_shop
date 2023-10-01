@props(['active'])

@php
$classes = ($active ?? false)
            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400  border-indigo-600 text-sm font-medium leading-5 text black-900  text black-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text black-500  text black-400 hover:text black-700  hover:text black-300 hover:border-gray-300  hover:border-gray-700 focus:outline-none focus:text black-700  focus:text black-300 focus:border-gray-300  focus:border-gray-700 transition duration-150 ease-in-out';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
