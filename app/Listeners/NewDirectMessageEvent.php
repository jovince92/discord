<?php

namespace App\Listeners;

use App\Events\NewDirectMessageEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NewDirectMessageEvent
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
    public function handle(NewDirectMessageEvent $event): void
    {
        //
    }
}
