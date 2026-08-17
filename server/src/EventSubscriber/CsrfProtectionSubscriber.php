<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CsrfProtectionSubscriber implements EventSubscriberInterface
{
    private const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

    public static function getSubscribedEvents(): array
    {
        return [KernelEvents::REQUEST => ['onKernelRequest', 8]];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if (!str_starts_with($request->getPathInfo(), '/api')) {
            return;
        }

        if (in_array($request->getMethod(), self::SAFE_METHODS, true)) {
            return;
        }

        // exclure la route de login, pas de csrf_token disponible avant connexion
        if ($request->getPathInfo() === '/api/login_check') { 
            return;
        }

        $headerToken = $request->headers->get('X-CSRF-Token');
        $cookieToken = $request->cookies->get('csrf_token');
// dump([
//     'header' => $headerToken,
//     'cookie' => $cookieToken,
//     'all_cookies' => $request->cookies->all(),
// ]);
        if (!$headerToken || !$cookieToken || !hash_equals($cookieToken, $headerToken)) {
            $event->setResponse(new JsonResponse(['error' => 'Invalid CSRF token'], 403));
        }
    }
}