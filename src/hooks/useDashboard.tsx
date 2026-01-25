
import {
    Briefcase, Calendar, Code, Compass, FileText, GraduationCap, Handshake, Home, Rocket, School, Star, Users, Building
} from "lucide-react";

import StudentDashboard from "@/pages/StudentDashboard";
import EntrepreneurDashboard from "@/pages/EntrepreneurDashboard";
import CollegeDashboard from "@/pages/CollegeDashboard";
import CompanyDashboard from "@/pages/CompanyDashboard";

const iconProps = { className: "h-4 w-4" };

const dashboards = {
    student: {
        header: { 
            icon: <GraduationCap className="h-6 w-6" />, 
            title: "Student Dashboard" 
        },
        sidebarNav: [
            { icon: <Home {...iconProps} />, title: "Personalized Path" },
            { icon: <Briefcase {...iconProps} />, title: "Jobs" },
            { icon: <Code {...iconProps} />, title: "Development" },
            { icon: <Rocket {...iconProps} />, title: "Startup Hub" },
        ],
        mainContent: <StudentDashboard />
    },
    entrepreneur: {
        header: { 
            icon: <Rocket className="h-6 w-6" />, 
            title: "Founder Dashboard" 
        },
        sidebarNav: [
            { icon: <Rocket {...iconProps} />, title: "Startup Launchpad" },
            { icon: <FileText {...iconProps} />, title: "Resources" },
            { icon: <Users {...iconProps} />, title: "Community" },
        ],
        mainContent: <EntrepreneurDashboard />
    },
    college: {
        header: { 
            icon: <School className="h-6 w-6" />, 
            title: "College Dashboard" 
        },
        sidebarNav: [
            { icon: <Briefcase {...iconProps} />, title: "Placement Support" },
            { icon: <Handshake {...iconProps} />, title: "Collaborations" },
            { icon: <Calendar {...iconProps} />, title: "Events" },
        ],
        mainContent: <CollegeDashboard />
    },
    company: {
        header: { 
            icon: <Building className="h-6 w-6" />, 
            title: "Company Dashboard" 
        },
        sidebarNav: [
            { icon: <Users {...iconProps} />, title: "Talent Pool" },
            { icon: <Briefcase {...iconProps} />, title: "Jobs & Projects" },
            { icon: <Handshake {...iconProps} />, title: "Engagement" },
        ],
        mainContent: <CompanyDashboard />
    },
};

export const useDashboard = (role: string) => {
    switch (role) {
        case 'student':
            return dashboards.student;
        case 'entrepreneur':
        case 'startup': // Using 'startup' as an alias for entrepreneur
            return dashboards.entrepreneur;
        case 'college':
            return dashboards.college;
        case 'company':
            return dashboards.company;
        default:
            return dashboards.student; // Default to student dashboard
    }
}; 
