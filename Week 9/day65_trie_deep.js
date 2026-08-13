// Problem 1 — Trie Implementation (Write from scratch!)

{
    class TrieNode {
        constructor() {
            this.children = {};
            this.isEnd = false;
        }
    }

    class Trie {
        constructor() {
            this.root = new TrieNode();
        }
        insert(word) {
            let node = this.root;
            for (let bit of word) {
                if (!node.children[bit]) {
                    node.children[bit] = new TrieNode();
                }
                node = node.children[bit];
            }
            node.isEnd = true;
        }

        search(word) {
            let node = this.root;
            for (let bit of word) {
                if (!node.children[bit]) return false;
                node = node.children[bit];
            }
            return node.isEnd;
        }

        startsWith(prefix) {
            let node = this.root;
            for (let bit of prefix) {
                if (!node.children[bit]) return false;
                node = node.children[bit];
            }
            return true;
        }
    }

    const trie = new Trie();
    trie.insert("apple");
    trie.insert("app");
    trie.insert("application");

    console.log(trie.search("apple"));     // true
    console.log(trie.search("app"));       // true
    console.log(trie.search("ap"));        // false
    console.log(trie.startsWith("app"));   // true
    console.log(trie.startsWith("xyz"));   // false
}
// Note: LeetCode #208 — this is the foundation. Search checks isEnd, startsWith doesn't!

// Problem 2 — Count Words Equal to and Starting With Prefix

{
    class Trie {
        constructor() {
            this.root = {children: {}, count: 0, endCount: 0};
        }
        insert(word) {
            let node = this.root;
            for (let bit of word) {
                if (!node.children[bit]) {
                    node.children[bit] = {children: {}, count: 0, endCount: 0};
                }
                node = node.children[bit];
                node.count++;
            }
            node.endCount++;
        }
        countWordsEqualTo(word) {
            let node = this.root;
            for (let bit of word) {
                if (!node.children[bit]) return 0;
                node = node.children[bit];
            }
            return node.endCount;
        }
        countWordsStartingWith(prefix) {
            let node = this.root;
            for (let bit of prefix) {
                if (!node.children[bit]) return 0;
                node = node.children[bit];
            }
            return node.count;
        }
    }
    const trie = new Trie();
    ["apple", "app", "apple", "application"].forEach(w => trie.insert(w));

    console.log(trie.countWordsEqualTo("apple"));       // 2
    console.log(trie.countWordsStartingWith("app"));    // 4
    console.log(trie.countWordsStartingWith("apple"));  // 2
}
// Note: Extended Trie with counters! count = words passing through node, endCount = words ending at node!

// Problem 3 — Design Add and Search Words

{
    class TrieNode {
        constructor() {
            this.children = {};
            this.isEnd = false;
        }
    }
    class WordDictionary {
        constructor() { this.root = new TrieNode(); }

        addWord(word) {
            let node = this.root;
            for ( let bit of word) {
                if (!node.children[bit]) {
                    node.children[bit] = new TrieNode();
                }
                node = node.children[bit];
            }
            node.isEnd = true;
        }
        search(word) {
            function dfs(node, i) {
                if (i === word.length) return node.isEnd;

                const bit = word[i];
                if (bit === '.') {
                    for (let child of Object.values(node.children)) {
                        if (node, i + 1) return true;
                    }
                    return false;
                }
                if (!node.children[bit]) return false;
                return dfs(node.children[bit], i + 1);
            }
            return dfs(this.root, 0);
        }
    }

    const dict = new WordDictionary();
    ["bad", "dad", "mad"].forEach(w => dict.addWord(w));

    console.log(dict.search("pad")); // false
    console.log(dict.search("bad")); // true
    console.log(dict.search(".ad")); // true (matches bad/dad/mad)
    console.log(dict.search("b..")); // true
}
// Note: LeetCode #211 — '.' is wildcard, try ALL children! DFS handles the branching!

// Problem 4 — Replace Words

{
    class TrieNode {
        constructor() { this.children = {}; this.isEnd = false; }
    }

    function replaceWords(dictionary, sentence) {
        const root = new TrieNode();

        for (let word of dictionary) {
            let node = root;
            for (let bit of word) {
                if (!node.children[bit]) {
                    node.children[bit] = new TrieNode();
                }
                node = node.children[bit];
            }
            node.isEnd = true;
        }
        return sentence.split(" ").map(word => {
            let node = root;
            let prefix = "";

            for (let bit of word) {
                if (!node.children[bit]) break;
                prefix += bit;
                node = node.children[bit];
                if (node.isEnd) return prefix;
            }
            return word;
        }).join(" ");
    }

    console.log(replaceWords(
        ["cat","bat","rat"],
        "the cattle was rattled by the battery"
    ));
    // "the cat was rat by the bat"
}
// Note: LeetCode #648 — build trie from roots, then for each word find shortest matching root. Return root if found, original word if not!

// Problem 5 — Longest Word in Dictionary

{
    class TrieNode {
        constructor() { this.children = {}; this.word = null; }
    }

    function longestWord(words) {
        const root = new TrieNode();

        for (let word of words) {
            let node = root;
            for (let bit of word) {
                if (!node.children[bit]) {
                    node.children[bit] = new TrieNode();
                }
                node = node.children[bit];
            }
            node.word = word;
        }
        let longest = "";
        let queue = [root];

        while (queue.length > 0) {
            const node = queue.shift();

            for (let child of Object.values(node.children)) {
                if (child.word) {
                    if (child.word.length > longest.length || child.word < longest) {
                        longest = child.word;
                    }
                    queue.push(child);
                }
            }
        }
        return longest;
    }

    console.log(longestWord(["w","wo","wor","worl","world"]));
    // "world"
    console.log(longestWord(["a","banana","app","appl","ap","apply","apple"]));
    // "apple"
}
// Note: LeetCode #720 — valid word = all its prefixes exist in dictionary. BFS through trie following only complete words!

// Problem 6 — Search Suggestions System

{
    class TrieNode {
        constructor() { this.children = {}; this.words = []; }
    }

    function suggestedProducts(products, searchWord) {
        products.sort();
        const root = new TrieNode();

        for (let product of products) {
            let node = root;
            for (let bit of product) {
                if (!node.children[bit]) {
                    node.children[bit] = new TrieNode();
                }
                node = node.children[bit];

                if (node.words.length < 3) {
                    node.words.push(product);
                }
            }
        }
        const result = [];
        let node = root;

        for (let bit of searchWord) {
            if (node && node.children[bit]) {
                node = node.children[bit];
                result.push(node.words);
            }
            else {
                node = null;
                result.push([]);
            }
        }
        return result;
    }

    console.log(suggestedProducts(
        ["mobile","mouse","moneypot","monitor","mousepad"],
        "mouse"
    ));
    // [["mobile","moneypot","monitor"],
    //  ["mobile","moneypot","monitor"],
    //  ["mouse","mousepad"],
    //  ["mouse","mousepad"],
    //  ["mouse","mousepad"]]
}
// Note: LeetCode #1268 — store top 3 suggestions at each trie node. Sort products first for lexicographic order. This is literally how search autocomplete works!

// Problem 7 — Maximum XOR of Two Numbers

{
    class TrieNode {
        constructor() { this.children = [null, null]; } // 0 or 1
    }
    function findMaximumXOR(nums) {
        const root = new TrieNode();

        for (let num of nums) {
            let node = root;
            for (let i = 31; i >= 0; i--) {
                const bit = (num >> i) & 1;
                if (!node.children[bit]) {
                    node.children[bit] = new TrieNode();
                }
                node = node.children[bit];
            }
        }
        let maxXor = 0;

        for (let num of nums) {
            let node = root;
            let currentXor = 0;

            for (let i = 31; i >= 0; i--) {
                const bit = (num >> i) & 1;
                const opposite = 1 - bit;

                if (node.children[opposite]) {
                    currentXor = (currentXor << 1) | 1;
                    node = node.children[opposite];
                } else {
                    currentXor = currentXor << 1;
                    node = node.children[bit];
                }
            }
            maxXor = Math.max(maxXor, currentXor);
        }
        return maxXor;
    }

    console.log(findMaximumXOR([3,10,5,25,2,8])); // 28
    console.log(findMaximumXOR([14,70,53,83,49,91,36,80,92,51,66,70])); // 127
}