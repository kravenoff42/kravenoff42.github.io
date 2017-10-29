<!--Used to Outline Project-->
ani-hero
=================

Outline
-------

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

	- [Overview](#overview)
	- [Audience](#audience)
	- [Platform](#platform)
	- [Credits](#credits)
	- [Technologies](#technologies)
	- [Core Functionality](#core-functionality)
	- [Timeframe](#timeframe)
	- [Bonus Points](#bonus-points)

<!-- /TOC -->

## Overview
> **What's the basic idea?**

This will be a animated hero that with display a randomly selected animation from list of animations and display them as the hero animation for my portfolio site.

## Audience
> **Who is this meant for?**

Potential employers, and me!

> **What do they say about the idea?**

I like it, I think it will help highlight my eclectic interests without require a huge infrastructure.

## Platform
> **Where will this live?**

Github Pages until I get a real webserver

## Credits
> **Who is helping?**

The Team:
- Me (obviously)

> **Who will maintain it?**

- Me!

## Technologies
> **What tools will be needed?**

The Tools:
- p5.js

## Core Functionality
> **What is the minimum viable product?**

The Checklist:
- Randomly selects an animation for an array/hash table and displays on landing page
- All animations should be initiated with a single call
- Each animation should be computationally light, Ideally just calculation the position and appearance of a set of shapes
- Keep object count under 300 instances
- No DOM manipulations (canvas only)
- kill switch for after the user scrolls away, or else a link to the actual portfolio Page
- - This might work better considering the how the Kollection works


## Timeframe
> **How long assuming a part-time schedule?**

1 week for infrastructure

## Bonus Points
> **What might get added if at all possible?**

The Wishlist:
1. A way of selecting the desired animation
2. refactor to have animations stored anywhere, not just in a single sketch.
  - maybe using some kind of meta data to tag the project as part of the animation pool
3. A way of exporting the animations as gifs
4. A simple way to embed the animations as a signature in correspondence
