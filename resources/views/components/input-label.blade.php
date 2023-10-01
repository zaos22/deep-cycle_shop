@props(['value'])

<label {{ $attributes->merge(['class' => 'block font-medium text-sm text black-700  text black-300']) }}>
    {{ $value ?? $slot }}
</label>
