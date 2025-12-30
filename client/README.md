Candidate: Hema Mane
Role: Full Stack Developer (MERN)
Company: OpEzee Private Limited
Test Duration: ~5 Working Days
Platform Tested: Windows (Primary), macOS (Development)


Overview

This project is a cross-platform application launcher and controller built using the MERN stack.
It allows users to register desktop applications, launch and terminate them remotely, and control them through a web-based UI.

The system is designed with a clear separation of concerns:

A Node.js background server responsible for OS-level process management

A React-based control UI for interacting with applications

MongoDB for persistence

The architecture is intentionally kept extensible so that additional control or monitoring features can be added without major refactoring.


ech Stack

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

OS Integration: child_process (spawn, exec)

Platform: Windows (target), macOS (development)


<!-- Part 1 – Server Setup (Mandatory) -->
What was implemented:

A Node.js background server capable of running independently

OS-level application launching using executable paths

Ability to terminate running applications

REST APIs exposed for frontend interaction

Key Learnings:

Handling OS-specific execution logic

Managing child processes safely

Designing APIs for system-level operations

Time spent: ~1.5 days






<!-- Part 2 – Application Management (Mandatory) -->
What was implemented:

MongoDB schema to store application metadata

APIs to:

Add applications

Delete applications

Fetch all applications

Support for application parameters/arguments

Key Learnings:

Persisting system configuration in a database

Designing clean CRUD APIs for launcher use cases

Time spent: ~1 day


<!-- Part 3 – Control UI (Mandatory) -->
What was implemented:

React-based UI to manage applications

List view displaying all registered applications

Ability to:

Launch applications

Kill running applications

Application icon extraction and display

Clean separation between UI and backend logic

Key Learnings:

Building a responsive control UI

Connecting frontend actions to OS-level backend operations

Time spent: ~1 day


<!-- Part 4 – Showing Off (Frontend) -->

Instead of implementing a media-player-specific UI, I designed a generic
remote application control dashboard inspired by media player controls.

The React interface provides real-time feedback, keyboard shortcuts,
mobile-friendly interaction, and a “now running” experience similar to
a remote media controller, while remaining applicable to any desktop
application.


Architectural Summary
React Control UI
        ↓
Express REST APIs
        ↓
Node.js Process Manager
        ↓
Windows / OS Applications


MongoDB is used to persist application configuration and metadata.


Possible Future Enhancements

Real-time status via WebSockets

Application health monitoring

Workflow / scene automation

Authentication and device pairing

Native mobile wrapper for the UI

 Time Summary
Part	Description	Time Spent
Part 1	Server Setup	~1.5 days
Part 2	App Management	~1 day
Part 3	Control UI	~1 day
Part 4	Frontend Enhancement	~1 day
Total		~4.5 days


