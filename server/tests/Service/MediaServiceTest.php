<?php
// tests/Service/MediaServiceTest.php

namespace App\Tests\Service;

use App\Entity\Media;
use App\Repository\MediaRepository;
use App\Service\MediaService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(MediaService::class)]
class MediaServiceTest extends TestCase
{
    public function testFindOrCreateReturnsExistingMedia(): void
    {
        $existingMedia = new Media();

        $mediaRepository = $this->createMock(MediaRepository::class);
        $mediaRepository->method('findByTMDBIdAndType')->willReturn($existingMedia);

        $em = $this->createMock(EntityManagerInterface::class);
        $em->expects($this->never())->method('persist');
        $em->expects($this->never())->method('flush');

        $service = new MediaService($mediaRepository, $em);
        $result = $service->findOrCreate(12345, 'movie');

        $this->assertSame($existingMedia, $result);
    }

    public function testFindOrCreateCreatesNewMediaWhenNotFound(): void
    {
        $mediaRepository = $this->createMock(MediaRepository::class);
        $mediaRepository->method('findByTMDBIdAndType')->willReturn(null);

        $em = $this->createMock(EntityManagerInterface::class);
        $em->expects($this->once())->method('persist');
        $em->expects($this->once())->method('flush');

        $service = new MediaService($mediaRepository, $em);
        $result = $service->findOrCreate(12345, 'movie');

        $this->assertInstanceOf(Media::class, $result);
        $this->assertEquals(12345, $result->getTmdbId());
        $this->assertEquals('movie', $result->getType());
    }

    public function testFindMediaReturnsNullWhenNotFound(): void
    {
        $mediaRepository = $this->createMock(MediaRepository::class);
        $mediaRepository->method('findByTMDBIdAndType')->willReturn(null);

        $em = $this->createMock(EntityManagerInterface::class);

        $service = new MediaService($mediaRepository, $em);
        $result = $service->findMedia(99999, 'tv');

        $this->assertNull($result);
    }
}