<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        $response = $event->getResponse();

        $csrfToken = bin2hex(random_bytes(32));

        $csrfCookie = Cookie::create('csrf_token')
            ->withValue($csrfToken)
            ->withHttpOnly(false) 
            ->withSecure(false)
            ->withSameSite('lax')
            ->withPath('/')
            ->withExpires(time() + 3600);
        $response->headers->setCookie($csrfCookie);
    }
}