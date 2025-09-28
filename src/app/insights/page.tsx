import DashboardLayout from '../dashboard/_components/dashboard-layout';
import Feed from './_components/feed';

const InsightsFeedPage = () => {
    return (
        <DashboardLayout>
            <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
                <Feed />
            </div>
        </DashboardLayout>
    )
}

export default InsightsFeedPage;
