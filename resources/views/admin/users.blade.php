<x-app-layout>
    <x-slot name="header">
        <div class="text-center">
            <h1 class="font-semibold text-xl text black-800  text black-200 leading-tight">
                {{ __('Users') }}
            </h1>
        </div>
    </x-slot>

    <div class="py-7">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="colorbg1 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text black-900 flex items-center justify-center text black-100">
                    <div id="users"></div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
