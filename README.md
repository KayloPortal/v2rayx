# v2rayx

A modern, cross-platform desktop application built with **Tauri**, **React**, and **Vite** designed to manage V2Ray proxy configurations and bypass internet censorship.

## Features

- ⚡ **Lightweight & Fast**: Built on Tauri with minimal resource footprint.
- 🌐 **Multi-Protocol Support**: Manage VLESS, VMess, Reality, and Shadowsocks nodes.
- 📊 **Real-Time Latency**: Track server ping and connection status.
- 🎨 **Modern UI**: Clean and responsive React-based interface.

## Prerequisites

Before getting started, make sure you have installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Rust & Cargo](https://www.rust-lang.org/tools/install)
- Platform-specific Tauri prerequisites (see [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/))

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KayloPortal/v2rayx.git
   cd v2rayx
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in development mode:**
   ```bash
   npm run tauri dev
   ```

4. **Build production bundle:**
   ```bash
   npm run tauri build
   ```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
