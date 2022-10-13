class Instagram {
    constructor() {
        // Write code here...
        // rather than having an array of arrays or array of objects
        // think it has better performance to have two separate arrays
        // where 
        // photoId = this.photoIds[i] is posted by 
        // userId = this.posterIds[i]

        // instagram has an internal count variable
        // that keeps track of number of photos posted
        this.postNumber = 0;

        // each user has their own separate array of their 10 most recent posted
        // photos -- photoId + postNumber
        // later refactor this to intialize as array as default
        this.recentPostsByUser = {};
        
        // each user has a set of followed users
        this.followedUsers = {};

    }

    postPhoto(userId, photoId) {
        //Time: O(1)  -- empty arr intialize, push, unshift, all O(1) ops 
        //Space: O(1) -- same array, at most 10 elements
        this.postNumber+=1;
        const userPosts = this.recentPostsByUser[userId] || [];
        // store userId so when we use heap we know which
        // array to get replacement in heap from 
        userPosts.push([this.postNumber, photoId, userId]);
        if (userPosts.length > 10) userPosts.unshift();
        this.recentPostsByUser = userPosts;
    }

    getFeed(userId) {
        const followedSet = this.followedUsers[userId];
        // idea is to map each followed userId
        // to their 10 most recent photos
        // and then "merge" their photos until we have 10
        // get array of arrays 
        // array of ptrs as well
        // 

        // use heap solution to merge k arrays (similar to leetcode)
        // until we have 10 most recent


        // algorithm sketch:
        // 1. for each array -> insert most recent photo into heap
        // 2. create ptr for each array to show next photo to add from that arr
        // 3. create array to store 10 most recent
        // 4. while most recent array len < 10 and heap is non empty
        // 4a. pop off most recent photo (largest postNum) and add to recent arr
        // 4b. add next most recent photo from same arr (if exists) to heap
        // 5. return recent arr
    }

    follow(followerId, followeeId) {
        // make sure set is initialized
        this.followedUsers[followeeId] ||= new Set();
        this.followedUsers[followeeId].add(followerId);
    }

    unfollow(followerId, followeeId) {
        const followedSet = this.followedUsers[followeeId];
        if(followedSet) followedSet.delete(followerId);
    }

}

// Test Case
const instagram = new Instagram();

instagram.postPhoto(1,11) // User with id=1 posts a photo with id=11
instagram.getFeed(1) // returns [11]
instagram.postPhoto(2, 12) // User with id=2 posts a photo with id=12
instagram.getFeed(1) // returns [11]
instagram.follow(1,2) // User 1 follows User 2
instagram.postPhoto(3, 13) // User with id=3 posts a photo with id=13
instagram.postPhoto(3, 14) // User with id=3 posts a photo with id=14
instagram.postPhoto(3, 15) // User with id=3 posts a photo with id=15
instagram.postPhoto(3, 16) // User with id=3 posts a photo with id=16
instagram.postPhoto(3, 17) // User with id=3 posts a photo with id=17
instagram.postPhoto(3, 18) // User with id=3 posts a photo with id=18
instagram.postPhoto(3, 19) // User with id=3 posts a photo with id=19
instagram.getFeed(2) // returns [12]
instagram.follow(2,3) // User 2 follows User 3
instagram.getFeed(2) // returns [19, 18, 17, 16, 15, 14, 13, 12]
instagram.postPhoto(4, 20) // User with id=4 posts a photo with id=20
instagram.postPhoto(4, 21) // User with id=4 posts a photo with id=21
instagram.postPhoto(4, 22) // User with id=4 posts a photo with id=22
instagram.postPhoto(4, 23) // User with id=4 posts a photo with id=23
instagram.follow(2,4) // User 2 follows User 4
instagram.getFeed(2) // returns [23, 22, 21, 20, 19, 18, 17, 16, 15, 14]
instagram.unfollow(2,3) // User 2 unfollows User 3
instagram.getFeed(2) // returns [ 23, 22, 21, 20, 12 ]
instagram.unfollow(2,4) // User 2 unfollows User 4
instagram.getFeed(2) // returns [ 12 ]