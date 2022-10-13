# Let's build Instagram!

Design a simplified version of Instagram where users can post photos, follow/unfollow other users, and is able to view the `10` most recent photos in the user's feed.

Implement the Instagram class:

 - `Instagram()` initializes your Instagram object.
 - `postPhoto(userId, photoId)` composes a new photo with ID `photoId` by the user `userId`. Each call to this function will be made with a unique `photoId`.
 - `getFeed(userId)` retrieves the `10` most recent photo IDs in the user's feed. Each item in the feed must be posted by users who the user followed or by the user themself. Photos must be **ordered from the most recent to least recent**.
 - `folllow(followerId, followeeId)` The user with ID `followerId` starts following the user with ID `followeeId`.
 - `unfollow(followerId, followeeId)` The user with ID `followerId` starts unfollowing the user with ID `followeeId`.
 
 In order to receive full credit, you must comment each function with a space and time complexity analysis with your variables defined. You may add any helper functions that you feel like would be useful.

## **Example:**

**Inputs:**
The first list lists the functions to invoke. The second list lists the arguments passed into the corresponding functions in the first list.
- `["Instagram", "postPhoto", "getFeed", "follow", "postPhoto", "getFeed", "unfollow", "getFeed"]`
- `[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]`

**Output:**

 - `[null, null, [5], null, null, [6, 5], null, [5]]`

**Explanation:**

```
const instagram = new Instagram();
// Create an instance of Instagram.

instagram.postPhoto(1, 5); 
// User 1 posts a new photo (id = 5).

instagram.getFeed(1);  
// User 1's feed should return a list with 1 photo id -> [5]. return [5]

instagram.follow(1, 2);    
// User 1 follows user 2.

instagram.postPhoto(2, 6); 
// User 2 posts a new photo (id = 6).

instagram.getFeed(1);  
// User 1's feed should return a list with 2 photo ids -> [6, 5]. 
// Photo id 6 should precede photo id 5 because it is posted after photo id 5.

instagram.unfollow(1, 2);  
// User 1 unfollows user 2.

instagram.getFeed(1);  
// User 1's feed should return a list with 1 photo id -> [5], since user 1 is no longer following user 2.
```