import { lazy } from 'react';

const AddActualityApp = lazy(() => import('./add/AddActualityApp'));
const Actualities = lazy(() => import('./list/Actualities'));
const EditActualityApp = lazy(() => import('./edit/EditActualityApp'));
const ActualityListApp = lazy(() => import('./flux/ActualityListApp'));
const FrontActuality = lazy(() => import('./front/FrontActuality'));
const Comment = lazy(() => import('./commentaire/Comment'));
const Categorie = lazy(() => import('./categorie/Categorie'));
const Type = lazy(() => import('./type/Type'));

const actualityAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/actuality/list',
      element: <Actualities />,
    },
    {
      path: 'apps/addActuality',
      element: <AddActualityApp />,
    },
    {
      path: `/apps/actuality/:actualityId/*`,
      element: <EditActualityApp />
    },
    {
      path: `/apps/timeline`,
      element: <ActualityListApp />
    },
    {
      path: `/apps/front-actuality`,
      element: <FrontActuality />
    },
    {
      path: `/apps/edit-comments`,
      element: <Comment />
    },
    {
      path: `/apps/categorie`,
      element: <Categorie />
    },
    {
      path: `/apps/type`,
      element: <Type />
    }
  ],
};

export default actualityAppConfig;