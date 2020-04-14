<?php

return [
  /**
   * List all the sub-classes of Rareloop\Lumberjack\Post in your app that you wish to
   * automatically register with WordPress as part of the bootstrap process.
   */
  'register' => [
    // App\PostTypes\Activity::class,
    // App\PostTypes\MyPage::class,
    App\PostTypes\Press::class,
    App\PostTypes\News::class,
    App\PostTypes\Community::class,
  ],
];
