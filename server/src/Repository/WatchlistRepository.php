<?php

namespace App\Repository;

use App\Entity\Watchlist;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Watchlist>
 */
class WatchlistRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Watchlist::class);
    }

       /**
        * @return Watchlist[] or null Returns an array of Watchlist objects or null
        */
       public function findByUser(User $user): ?array
       {
           return $this->createQueryBuilder('w')
               ->andWhere('w.user = :user')
               ->setParameter('user', $user)
               ->orderBy('w.id', 'ASC')
               ->setMaxResults(10)
               ->getQuery()
               ->getResult()
           ;
       }
       
    //    public function findOneBySomeField($value): ?Watchlist
    //    {
    //        return $this->createQueryBuilder('w')
    //            ->andWhere('w.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
