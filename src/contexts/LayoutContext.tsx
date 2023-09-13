import React, {useState} from "react";

interface View {
    id: string
    width: number
}

export interface LayoutContextType {
    views: View[]
    openView: (view: View) => void
    closeViews: (ids: string[]) => void
}

export const LayoutContext = React.createContext<LayoutContextType | null>(null);

interface LayoutContextProviderProps {
    children: React.ReactNode
}

export const LayoutContextProvider = ({children}: LayoutContextProviderProps) => {

    const [views, setViews] = useState<View[]>([]);

    const openView = (view: View) => {
        setViews(views => [...views, view]);
    }

    const closeViews = (ids: string[]) => {
        setViews(views => views.filter(view => !ids.includes(view.id)));
    }

    return <LayoutContext.Provider value={{
        views,
        closeViews,
        openView
    }}>
        {children}
    </LayoutContext.Provider>

}


