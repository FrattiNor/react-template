type Props = {
    queryKey: string[];
    queryFn: () => void;
};

const useQuery = (props: Props) => {
    console.log(props);
    return 0;
};

export default useQuery;
