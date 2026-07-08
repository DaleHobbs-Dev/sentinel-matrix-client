// Barrel file for components

// Layout Components
export { Topbar } from './layout/Topbar';
export { Sidebar } from './layout/Sidebar';
export { Footer } from './layout/Footer';
export { Layout } from './layout/Layout';

// UI Components
export { Button } from './ui/Button';
export { AuthCard } from './ui/AuthCard';
export { Input } from './ui/Input';
export { Label } from './ui/Label';
export { FormField } from './ui/FormField';
export { H1, H2, H3 } from './ui/Heading';
export { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
export { Alert } from './ui/Alert';
export { Badge } from './ui/Badge';
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/Table';
export { Modal, ModalHeader, ModalBody, ModalFooter } from './ui/Modal';
export { Select } from './ui/Select';
export { Grid } from './ui/Grid';
export { PageHeader } from './ui/PageHeader';
export { Section } from './ui/Section';
export { Container } from './ui/Container';
export { LoadingPage } from './ui/LoadingPage';
export { Textarea } from './ui/Textarea';
export { Spinner } from './ui/Spinner';
export { DeleteConfirmationModal } from './ui/DeleteConfirmationModal';
export { SidebarLink } from './ui/SidebarLink';
export { IconWrapper } from './ui/IconWrapper';
export { Text } from './ui/Text';
export { Stack } from './ui/Stack';
export { FormPage } from './ui/FormPage';
export { ButtonGroup } from './ui/ButtonGroup';

// Future UI Components (commented out for now)
// export { DarkModeToggle } from './DarkModeToggle';
// export { Tooltip } from './Tooltip';
// export { Pagination } from './Pagination';
// export { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';
// export { Switch } from './Switch';
// export { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
// export { Avatar } from './Avatar';
// export { FileUpload } from './FileUpload';
// export { DatePicker } from './DatePicker';
// export { TimePicker } from './TimePicker';
// export { DateTimePicker } from './DateTimePicker';
// export { ProgressBar } from './ProgressBar';
// export { Carousel } from './Carousel';
// export { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from './Accordion';
// export { Slider } from './Slider';
// export { StarRating } from './StarRating';
// export { ColorPicker } from './ColorPicker';
// export { RichTextEditor } from './RichTextEditor';
// export { Notification } from './Notification';
// export { ToastContainer, toast } from './Toast';
// export { Wizard, WizardStep } from './Wizard';

// Course Components
export { CourseDashboardHeader } from "./courses/components/CourseDashboardHeader"
export { CourseList } from "./courses/components/CourseList"
export { CourseCard } from "./courses/components/CourseCard"
export { CourseForm } from "./courses/components/CourseForm"
export { CourseModal } from "./courses/components/CourseModal"
export { EditCourseForm } from "./courses/components/EditCourseForm"
export { NewCourseForm } from "./courses/components/NewCourseForm"
export { DeleteCourseConfirmationModal } from "./courses/components/DeleteCourseConfirmationModal"
export { CourseDetailsHeader } from "./courses/components/CourseDetailsHeader"
export { CourseStatusListItem } from "./courses/components/CourseStatusListItem"

// Course Pages
export { CourseDashboard } from "./courses/pages/CourseDashboard"
export { ActiveCourseListEditorPage } from "./courses/pages/ActiveCourseListEditorPage"
export { CourseFormPage } from "./courses/pages/CourseFormPage"
export { CourseDetailsPage } from "./courses/pages/CourseDetailsPage"
export { EditCourseRosterPage } from "./courses/pages/EditCourseRosterPage"

// Student Components
export { StudentList } from "./students/components/StudentList"
export { StudentSearchBar } from "./students/components/StudentSearchBar"
export { StudentRiskBadge } from "./students/components/StudentRiskBadge"
export { StudentDirectoryHeader } from "./students/components/StudentDirectoryHeader"

// Student Pages
export { StudentDirectory } from "./students/pages/StudentDirectory"

// Student Utilities
export { studentDirectoryColumns } from "./students/utils/studentTableColumns.jsx"
export {
  formatAcademicStanding,
  getCurrentCourseCount,
  getStudentFullName,
  studentMatchesSearch,
} from "./students/utils/studentFormatters"
