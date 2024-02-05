import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector, ViewContainerRef
} from '@angular/core';
import {ToastComponent} from "./toast/toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private viewContainerRef!: ViewContainerRef;


  public setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  showToast(message: string) {
    const toastComponentRef = this.viewContainerRef.createComponent(ToastComponent);
    toastComponentRef.instance.message = message;
    toastComponentRef.instance.show = true;

    setTimeout(() => {
      this.viewContainerRef.remove(this.viewContainerRef.indexOf(toastComponentRef.hostView));
    }, 5000);
  }
}
