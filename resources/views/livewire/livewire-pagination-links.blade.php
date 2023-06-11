@if ($paginator->hasPages())
    <div class="btn-group">
        {{-- previous page link --}}
        @if ($paginator->onFirstPage())
            <button type="button" title="Предыдущая страница" aria-pressed="false" class="fc-prev-button btn btn-primary"
                disabled>
                <span class="fa fa-chevron-left">
                </span>
            </button>
        @else
            <button type="button" title="Предыдущая страница" aria-pressed="false" class="fc-prev-button btn btn-primary"
                wire:click="previousPage">
                <span class="fa fa-chevron-left">
                </span>
            </button>
        @endif
        
        {{-- go to page --}}

        {{-- next page link --}}
        @if ($paginator->hasMorePages())
            <button type="button" title="Следующая страница" aria-pressed="false"
                class="fc-prev-button btn btn-primary" wire:click="nextPage">
                <span class="fa fa-chevron-right">
                </span>
            </button>
        @else
            <button type="button" title="Следующая страница" aria-pressed="false"
                class="fc-prev-button btn btn-primary" disabled>
                <span class="fa fa-chevron-right">
                </span>
            </button>
        @endif
    </div>
@endif
