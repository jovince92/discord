<?php

namespace App\Listeners;

use App\Events\DMUpdateEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DMUpdateEventListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(DMUpdateEvent $event): void
    {
        //
    }
}
