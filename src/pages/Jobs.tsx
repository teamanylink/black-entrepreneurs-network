import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Jobs = () => {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('type', 'job');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Jobs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <div key={job.id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500 mt-2">{job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;