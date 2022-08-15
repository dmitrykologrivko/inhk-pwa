import {Navigate} from 'react-router-dom';
import {AuthService} from "../auth";
import {SegmentedControl, SegmentedControlItem} from '../common/components/segmented-control';
import logo from '../../assets/images/logo.png';
import pwaLogo from '../../assets/images/pwa_logo.svg';
import reactLogo from '../../assets/images/react_logo.svg';
import '../App.css';

export function HomePage({authService = new AuthService()}) {
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;

    const content = isInstalled ? (
        <Navigate to='/login' replace={true}/>
    ) : (
        <div>
            <section id='start' style={{textAlign:'center', height: '100vh', display: 'flex', justifyContent:'center', alignItems: 'center', flexFlow: 'column'}}>
                <img src={logo} alt='' style={{ width: '256px', height: '256px' }}/>
                <h3>Онлайн-расписание <br/> Невинномысского химико-технологического колледжа</h3>
                <div>
                    <a href='/#install'><button>Установить</button></a>
                    <a href='/#about'><button>Подробнее</button></a>
                </div>
            </section>
            <section id='install' style={{padding: '8px' }}>
                <SegmentedControl>
                    <SegmentedControlItem title='Desktop' />
                    <SegmentedControlItem title='iOS' />
                    <SegmentedControlItem title='Android' />
                </SegmentedControl>
            </section>
            <section id='about' style={{height: '100vh', padding: '8px', textAlign:'center', display: 'flex', alignItems: 'center', justifyContent:'center', flexFlow: 'column'}}>
                <div>
                    <img className='App-logo' src={reactLogo} alt='' style={{ width: '256px', height: '256px' }}/>
                    <img src={pwaLogo} alt='' style={{ width: '256px', height: '256px' }}/>
                </div>
                <h4>
                    Основано на проекте <a href='https://inhk.ru/'>inhk.ru</a>
                </h4>
                <div>
                    Данное приложение является "Прогрессивным веб-приложением" (PWA).<br/>
                    PWA это технология в web-разработке, которая визуально и функционально трансформирует сайт в приложение (мобильное приложение в браузере).
                </div>
            </section>
        </div>
    );

    return (
        authService.isAuthenticated() ? (
            <Navigate to='/schedule' replace={true}/>
        ) : (
            content
        )
    );
}
