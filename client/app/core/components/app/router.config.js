import { PostListComponent } from '../../../posts/components/post-list/post-list.component';
import { PostNewComponent } from '../../../posts/components/post-new/post-new.component';
import { PostEditComponent } from '../../../posts/components/post-edit/post-edit.component';
import { AboutComponent } from '../about/about.component';
import { LoginComponent } from '../../../auth/components/login/login.component';

export const routes = [
  { path: '/', component: PostListComponent, name: 'List', useAsDefault: true },
  { path: '/new', component: PostNewComponent, name: 'New' },
  { path: '/edit/:id', component: PostEditComponent, name: 'Edit' },
  { path: '/about', component: AboutComponent, name: 'About' },
  { path: '/login', component: LoginComponent, name: 'Login' }
];
