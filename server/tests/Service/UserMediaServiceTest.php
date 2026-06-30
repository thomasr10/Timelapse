<?php
// tests/Service/UserMediaServiceTest.php

namespace App\Tests\Service;

use App\Entity\Media;
use App\Entity\User;
use App\Entity\UserMedia;
use App\Repository\UserMediaRepository;
use App\Service\UserMediaService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(MediaService::class)]
class UserMediaServiceTest extends TestCase
{
    public function testFindOrCreateReturnsExisting(): void
    {
        $existing = new UserMedia();

        $repo = $this->createMock(UserMediaRepository::class);
        $repo->method('findByUserIdAndMediaId')->willReturn($existing);

        $em = $this->createMock(EntityManagerInterface::class);
        $em->expects($this->never())->method('persist');

        $service = new UserMediaService($repo, $em);
        $result = $service->findOrCreate(new User(), new Media());

        $this->assertSame($existing, $result);
    }

    public function testFindOrCreateCreatesNewWithDefaults(): void
    {
        $repo = $this->createMock(UserMediaRepository::class);
        $repo->method('findByUserIdAndMediaId')->willReturn(null);

        $em = $this->createMock(EntityManagerInterface::class);
        $em->expects($this->once())->method('persist');
        $em->expects($this->once())->method('flush');

        $service = new UserMediaService($repo, $em);
        $result = $service->findOrCreate(new User(), new Media());

        $this->assertInstanceOf(UserMedia::class, $result);
        $this->assertFalse($result->isLiked());
        $this->assertFalse($result->isWatched());
        $this->assertNull($result->getRating());
    }

    public function testLikeSetsIsLikedAndIsWatched(): void
    {
        $userMedia = new UserMedia();

        $repo = $this->createMock(UserMediaRepository::class);
        $em = $this->createMock(EntityManagerInterface::class);
        $em->expects($this->once())->method('persist');
        $em->expects($this->once())->method('flush');

        $service = new UserMediaService($repo, $em);
        $service->like($userMedia, true);

        $this->assertTrue($userMedia->isLiked());
        $this->assertTrue($userMedia->isWatched());
    }

    public function testRateSetsRatingAndIsWatched(): void
    {
        $userMedia = new UserMedia();

        $repo = $this->createMock(UserMediaRepository::class);
        $em = $this->createMock(EntityManagerInterface::class);
        $em->expects($this->once())->method('persist');
        $em->expects($this->once())->method('flush');

        $service = new UserMediaService($repo, $em);
        $service->rate($userMedia, 4.5);

        $this->assertEquals(4.5, $userMedia->getRating());
        $this->assertTrue($userMedia->isWatched());
    }
}