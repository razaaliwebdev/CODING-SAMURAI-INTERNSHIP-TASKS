import haris from './images/haris.png';





export const assets = {
    haris
}



// About section cards data
export const aboutCardsData = [
    {
        id: 1,
        value: '5+',
        title: "Projects Completed"
    },
    {
        id: 2,
        value: "2+",
        title: "Years of Experience"
    },
    {
        id: 3,
        value: '2M+',
        title: "Lines of Code"
    },
    {
        id: 4,
        value: "28+",
        title: "Ui Designs Completed"
    }
];



// Projects Data
export const projectsData = [
    {
        id: 1,
        cate: "Backend",
        image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFja2VuZCUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        title: "E-Commerce API",
        link: "https://github.com/mockuser/ecommerce_api",
        description: "Robust RESTful API for an e-commerce platform handling user authentication (JWT), product management, orders, and payment integration. Implements soft-delete functionality for users and products.",
        technologies: ["Node.js", "Express", "JWT", "Bcrypt", "MongoDB", "Mongoose"],
    },
    {
        id: 2,
        cate: "Fullstack",
        image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGV2ZWxvcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        title: "Real-time Chat App",
        link: "https://github.com/mockuser/realtime_chat_mern",
        description: "A secure, instant messaging application enabling one-on-one and group chats. Built with the MERN stack for persistent storage and Socket.io for real-time bidirectional communication.",
        technologies: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
    },
    {
        id: 3,
        cate: "Frontend",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMHN0YWNrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        title: "Advanced Task Manager",
        link: "https://github.com/mockuser/task_manager_redux",
        description: "Frontend application for managing tasks with drag-and-drop functionality, status tracking, and project organization. Uses Redux Toolkit for centralized state management.",
        technologies: ["React", "Redux Toolkit", "Tailwind CSS", "React Router"],
    },
    {
        id: 4,
        cate: "Backend",
        image: "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        title: "Secure Auth Service",
        link: "https://github.com/mockuser/auth_microservice",
        description: "Standalone microservice dedicated to handling user registration, login, token refreshing, and password reset workflows. Designed for high security and scalability.",
        technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Passport.js"],
    },
    {
        id: 5,
        cate: "Fullstack",
        image: "https://images.unsplash.com/photo-1635830625698-3b9bd74671ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        title: "Image Upload Service",
        link: "https://github.com/mockuser/mern_image_upload",
        description: "A full-stack application demonstrating secure file uploads. Frontend uses React to select files, and the backend utilizes Multer to process and store images in a specified directory.",
        technologies: ["React", "Node.js", "Express", "Multer", "MongoDB"],
    },
    {
        id: 6,
        cate: "Frontend",
        image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        title: "Data Visualization Dashboard",
        link: "https://github.com/mockuser/data_viz_dashboard",
        description: "Interactive dashboard built to consume mock financial data via a REST API. Displays real-time charts (bar, line, pie) using Recharts for dynamic data visualization.",
        technologies: ["React", "Recharts", "Axios", "Context API"],
    },
    {
        id: 7,
        cate: "Backend",
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        title: "GraphQL Blog API",
        link: "https://github.com/mockuser/graphql_blog",
        description: "A content management system (CMS) API built using GraphQL, offering optimized data fetching for blog posts, comments, and author profiles.",
        technologies: ["Node.js", "Apollo Server", "GraphQL", "MongoDB"],
    },
    {
        id: 8,
        cate: "Fullstack",
        image: "https://images.unsplash.com/photo-1603575448360-153f093fd0b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        title: "Simple Inventory Tracker",
        link: "https://github.com/mockuser/mern_inventory_tracker",
        description: "A basic CRUD application for tracking inventory levels. Focuses on efficient data fetching, simple UI, and robust input validation on both client and server sides.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Zod"],
    },
];