# Minecraft Server launcher

This is a Minestrator Minecraft server launcher built with **Next.js**, **TypeScript**, and **Tailwind CSS**. The application provides real-time monitoring of a Minecraft server's status, usage statistics (CPU, RAM, Disk), and player activity.

## Features

- **Real-time Server Monitoring**: Get live updates on server status, CPU, memory, and disk usage.
- **User Interaction**: Start and stop the server with a toggle lever interface.
- **Responsive Design**: Works well on both mobile and desktop devices using Tailwind CSS for styling.
- **Dynamic Image Display**: View images from the server directory.
- **Drawer Component**: Contains detailed server information and usage statistics.

## Technologies Used

- **Next.js**: A React framework for building server-rendered and static web applications.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs.
- **use-sound**: A hook to play sounds in React applications.

## Getting Started

To run the launcher locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/minecraft-server-launcher.git
   cd minecraft-server-launcher
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root of the project and add your server's credentials:
   ```plaintext
   NEXT_PUBLIC_SERVER_TOKEN=your_minestrator_token
   NEXT_PUBLIC_SERVER_ID=your_minestrator_server_id
   NEXT_PUBLIC_SERVER_NAME=your_server_name
   NEXT_PUBLIC_SERVER_IP=your_server_ip
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the launcher.

5. To build for production:
   ```bash
   npm run build
   npm run start
   ```

## Project Structure

- **pages/**: Contains the main application page.
- **components/**: Reusable UI components like Drawer, Button, and Progress.
- **public/**: Static assets such as images and sound files.
- **api/**: Contains server-side logic, such as fetching images.

## Usage

1. **Toggle Server State**: Click on the lever image to start or stop the server.
2. **View Server Status**: The current server status (online/offline) is displayed prominently.
3. **Monitor Resources**: The launcher shows CPU, RAM, and Disk usage as progress bars.
4. **Player Information**: Displays the number of players currently online versus the maximum allowed.

## License

This project is licensed under the MIT License.
