class maxHeap {
    constructor() {
        this.heap = [];
    }

    insert(post){
        //Time: O(log N) -- when inserting new maximum 
        //               -> need log(N) swaps upward to keep heap property
        //Space: O(1)    -- adding 1 element to array
        let idx = this.heap.length;
        this.heap.push(post);
        
        let parentIdx = Math.floor((idx-1)/2);
        
        while (parentIdx >= 0 && this.heap[parentIdx].postNum < post.postNum){
            this.heap[idx] = this.heap[parentIdx];
            this.heap[parentIdx] = post;
            idx = parentIdx;
        }
    }

    pop(){
        //Time: O(log N) -- might need log(N) swaps downward to keep heap prop
        //Space: O(1)    -- removing 1 element from array
        if (this.heap.length === 1) return this.heap.pop();

        const mostRecentPost = this.heap[0];
        this.heap[0] = this.heap.pop();
        const heapSize = this.heap.length;
        const heap = this.heap;

        let i = 0;
        let swapHappened = false;

        do {
            let left = 2*i;
            let right = left + 1;
            let largest = i;
            if (left < heapSize && heap[left] < heap[largest]) largest = left;
            if (right < heapSize && heap[right] < heap[largest]) largest = right;
            
            if (i !== largest){
                const temp = heap[i];
                heap[i] = heap[largest];
                heap[largest] = temp;
                i = largest;
                swapHappened = true;
            }
        } while (swapHappened)
        
        return mostRecentPost;
    }

    length(){
        //Time: O(1) -- length of array is O(1) in JS
        //Space: O(1) -- get and return single primitive value
        return this.heap.length;
    }
}

class Instagram {
    constructor() {
        //Time: O(1) -- empty POJO initialize
        //Space: O(1) -- creating 2 empty POJOs

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
        const postNum = this.postNumber;
        userPosts.push({postNum, photoId, userId});
        if (userPosts.length > 10) userPosts.unshift();
        this.recentPostsByUser[userId] = userPosts;
    }

    getFeed(userId) {
        //Variable definitions:
        // 1. N followed Users

        //Time: O(NlogN) -- N arrays of 10 photos each
        //           -- create heap by inserting at most N photos
        //           -- have to remove 10x and insert another 9x 
        //           -- each pop is log(N) time and each insert is log(N) time

        // inserting N photos into heap = log(1) + log(2) + ... + log(N) time 
        // which is O(NlogN) 


        //Space: O(N) -- must create N arrays of 10 photos each
        //            -- also create heap of size N
        //            -- also create array of size 10 for return array
        //            -- also create array of size N for tracking idxs


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
        
        //must follow yourself  <- honestly not sure which function to add 
        //this part into 
        this.follow(userId, userId);

        const followedSet = this.followedUsers[userId];
        const followedIds = Array.from(followedSet);
        
        const photosByPoster = {};
        const postPtrs = {};
        const heap = new maxHeap();

        for (const id of followedIds){
            const userPosts = this.recentPostsByUser[id];
            if (userPosts === undefined) continue;

            photosByPoster[id] = userPosts;
            postPtrs[id] = userPosts.length - 1;
            
            heap.insert(userPosts[postPtrs[id]]);
            postPtrs[id]--;
        }

        const mostRecentPosts = [];
        for(let i = 0; i < 10 && heap.length() > 0; i++){
            const mostRecentPost = heap.pop();
            const posterId = mostRecentPost.userId;
            const postIdx = postPtrs[posterId];
            if (postIdx >= 0){
                heap.insert(photosByPoster[posterId][postIdx]);
                postPtrs[posterId]--;
            }
            mostRecentPosts.push(mostRecentPost.photoId);
        }
        
        return mostRecentPosts;
    }

    follow(followerId, followeeId) {
        //Time: O(1) -- at worst create new empty set and add one item
        //Space: O(1) -- at worst create new empty set and add one item
        // make sure set is initialized
        const followedSet = this.followedUsers[followerId] || new Set();
        followedSet.add(followeeId);
        this.followedUsers[followerId] = followedSet;
    }

    unfollow(followerId, followeeId) {
        //Time: O(1) -- at worst remove one item from set, O(1) op
        //Space: O(1) -- at worst remove one item from set, O(1) op
        const followedSet = this.followedUsers[followerId];
        if(followedSet) followedSet.delete(followeeId);
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