---
title: "Kotlin + Ktor: Building a Cryptocurrency"
date: 2021-04-18T21:11:32.810Z
---
### Building a Cryptocurrency with Kotlin

Kotlin has been becoming more and more mature with every release. We arguably have the most concise modern programming language that currently exists. With language idioms like data classes, extensions, kotlin objects, delegated properties, lambdas and of course, the latest version of Kotlin adds [coroutine](https://kotlinlang.org/docs/reference/coroutines.html) support. Lets talk about Node.js for a second. [Node.js ](https://nodejs.org/en/)helped us to create many amazing websites and services, and provides numerous modules to make our lives as developers easier. But just because a tool is good enough does not mean we should stop innovation there. Kotlin is now Node.js' competitor because Kotlin's powerful language idioms enable us to create a powerful and fast framework for building asynchronous servers and clients, called [Ktor](https://ktor.io/).\
\
Lets go back in time for a moment. Back in 2008 a small C++ side project was started by Satoshi Nakamoto. This project would change the world for ever. 10 years later Bitcoin managed to inspire dozens of crypto currency projects, in languages such as Rust and even Java. With features ranging from proof-of-stake, smart contracts and atomic-swaps.\
\
For this series of tutorials we will learn how cryptocurrencies are written by creating our own, by using Kotlin and nothing else. This currency will have most common features like a blockchain, peer-to-peer consensus, transaction validation, proof-of-work, wallets, smart contracts, and more. Don't worry its actually easier than you think. Also for simplicity we will skip some security features, so final result will not be fit for production use. The reason for these tutorial series is to learn about Kotlin and cryptocurrencies by writing one from scratch. So lets get started!

## It All Starts With a Chain of Blocks

Blockchain is a very simple data structure, similar to a linked list. The main difference is that each block holds the hash of the previous block. Think of a hash as a unique signature of that block, given all the data it currently contains, and even if a single bit of that data is different the hash would change. Just like a linked list, each item in the block chain has data. The base minimum data that a block needs to hold are:

* **index**: the number of the block in the chain.
* **previous hash**: calculated hash of the previous block at the moment of creation of the current block.
* **data**: this could be any data like transaction inputs and outputs, smart contract states and inputs, or any other data you wish to store. For this lesson we will keep a string value but in the next lessons we will store transaction data in this field.
* **hash**: unlike other fields this is a function that is called on the block to calculate its hash.

![blockchain diagram](/img/blockchain-diagram-3-1-.png "blockchain diagram")

There is a built in security feature in such a data structure. In order for a malicious actor to change a single block's data, the actor would have to modify the hash of that block and all the block following it in order to maintain the validity of the data structure.

```kotlin
data class Block(val index: Int,
                 val previousHash: String,
                 val timestamp: Long,
                 val data: String?) {
  
    fun hash()= Utils.sha256(this)
}
```

We will create a class to help us manage our collection of Blocks. Because we only need a single instance of the **BlockChain** we will make it a Kotlin singleton. For this lesson we will keep the BlockChain object simple. It will have two main functions **addNewBlock** and **isValid**. Lets see how our singleton object would look like in Kotlin.

```kotlin
object BlockChain {
    private val genesisBlock = Block(
            0,
            "98010BD9270F9B100B6214A21754FD33BDC8D41B2BC9F9DD16FF54D3C34FFD71",
            1539028,
            "Genesis Block"
    )

    private val blockChain = mutableListOf<Block>().also { it.add(genesisBlock) }

    fun get(): List<Block> = blockChain

    fun addNewBlock(data: String? = null) {
        ...
    }

    fun isValid(chain: List<Block>): Boolean {
        ...
    }
}
```

To add a new block to our list of blocks we simply create a new instance on the Block data class with the index of the current block, the hash of the previous block, the time stamp and the data string.

```kotlin
fun addNewBlock(data: String? = null) {
        blockChain.add(Block(blockChain.size,
                blockChain.last().hash(),
                System.currentTimeMillis() / 1000,
                data))
    }
```

To validate the chain we will iterate through every Block until the genesis block and make sure the **previousHash** matches the actual hash of the block, and the first block matches the hardcoded genesis block, that way we know none of the individual block has been modified. In the next lesson we will see how to pick the longest chain in the network to meet consensus but for now lets see how to implements the validation function:

```kotlin
    fun isValid(chain: List<Block>): Boolean {
        for (index in chain.size - 1 downTo 0) {
            val block = chain[index]
            if (index == 0) {
                return block == genesisBlock
            } else {
                if (block.previousHash != chain[index - 1].hash()) {
                    return false
                }
            }
        }
        return true
    }
```

And to add some final touches to our node implementation lets create couple endpoints to call the functions on or BlockChain object. But first lets add the following Ktor dependencies to our gradle build file:\
    compile "io.ktor:ktor-server-netty:$ktor_version"\
    compile "io.ktor:ktor-html-builder:$ktor_version"\
\
Next we will implement a simple Ktor Application module and create 3 endpoints, root that will display a list of all blocks, **/add** that will generate a new block on our chain, and finally a **/isValid** endpoint to check the validity of the current chain.
```kotlin
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.html.respondHtml
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import kotlinx.html.body
import kotlinx.html.p



fun main(args: Array<String>) {
    embeddedServer(
            Netty,
            watchPaths = listOf("./"),
            port = 3001,
            module = Application::myModule
    ).start(true)
}

fun Application.myModule() {
    routing {
        get("/") {
            call.respondHtml {
                body {
                    BlockChain.get().forEach {
                        p { text(it.toString()) }
                    }
                }
            }
        }
        get("/add") {
            BlockChain.addNewBlock()
            call.respondHtml {
                body {
                    p { text("Added block to block chain! :D") }
                }
            }
        }
        get("/isValid") {
            call.respondHtml {
                body {
                    p {
                        text("The chain is " +
                                if (BlockChain.isValid(BlockChain.get()))
                                    "valid"
                                else
                                    "invalid")
                    }
                }
            }
        }
    }
}
```
And as you can see the basic underlying structure of most blockchains is very simple. Hopefully this lesson helped you understand the basics of blockchain, the fundamental technology of most crypto currencies.
