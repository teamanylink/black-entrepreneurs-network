import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Ventures = () => {
  const { data: ventures, isLoading } = useQuery({
    queryKey: ['ventures'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('type', 'joint_venture');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Joint Ventures</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ventures?.map((venture) => (
          <div key={venture.id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{venture.title}</h3>
            <p className="text-sm text-gray-600">{venture.company}</p>
            <p className="text-sm text-gray-500 mt-2">{venture.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ventures;