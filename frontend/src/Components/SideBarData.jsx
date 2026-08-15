import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PieChartIcon from '@mui/icons-material/PieChart';
import CreateIcon from '@mui/icons-material/Create';

export const SideBarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/home"
    },
    {
        title: "Analytics",
        icon: <PieChartIcon />,
        link: "/analytics"
    },
    {
        title: "Create Activity",
        icon: <CreateIcon />,
        link: "/create-activity"
    },
]