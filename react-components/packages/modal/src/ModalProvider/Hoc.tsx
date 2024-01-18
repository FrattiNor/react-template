import Provider from './Provider';

// Hoc
const Hoc = <T,>(Component: T) => {
    const NextComponent = (props: any) => {
        const _Component = Component as any;
        return <Provider>{<_Component {...props} />}</Provider>;
    };

    return NextComponent as T;
};

export default Hoc;
