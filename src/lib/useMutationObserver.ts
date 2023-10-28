/**
 * Observer for DOM changes
 * 
 */
// Not used in any file
import React, { useCallback, useEffect, useState } from 'react'

interface useMutationObserverProps {
  target: React.RefObject<HTMLElement>;
  options?: MutationObserverInit;
  callback: MutationCallback
}

 const DEFAULT_OBSERVER_OPTIONS : MutationObserverInit = {
        characterDataOldValue:true,
        subtree:true,
    }

const useMutationObserver = ({ target, callback ,options = DEFAULT_OBSERVER_OPTIONS }:useMutationObserverProps) => {
 
    const [observer, setObserver] = useState<MutationObserver|null>(null);

    const dependencyList = [target, options, callback];

    // setting the observer inorder to start monitoring modifications
    const _useObserver = useCallback(() => {

        if(!observer ) return null;
        
        // watch for modifications made on target node.
        observer.observe(target.current as Node, options);

    }, dependencyList);

    // memorized callback fn is returned to avoid
    // heavy recontruction upon re-rendering
    const _callback = useCallback(callback, dependencyList)

    useEffect(()=>{

        // getting a reference to observer object
        const _observer = new MutationObserver(_callback);
        if(!observer)  setObserver(_observer);

    }, dependencyList);

    useEffect(() => {

        _useObserver()

        // cleaning up & disconnecting the observer off the target node
       return () => {

            if(!observer) return ;

            observer.disconnect();
        }

    }, dependencyList)

    
}

export default useMutationObserver