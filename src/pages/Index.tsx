import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  grade: string;
  pages: number;
  format: string;
  isFavorite: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: 'Решение квадратных уравнений', subject: 'Математика', grade: '8 класс', pages: 12, format: 'PDF', isFavorite: false },
    { id: 2, title: 'Анализ произведения "Евгений Онегин"', subject: 'Литература', grade: '9 класс', pages: 8, format: 'PDF', isFavorite: false },
    { id: 3, title: 'Законы Ньютона - практические задачи', subject: 'Физика', grade: '10 класс', pages: 15, format: 'PDF', isFavorite: false },
    { id: 4, title: 'Органическая химия: углеводороды', subject: 'Химия', grade: '10 класс', pages: 10, format: 'PDF', isFavorite: false },
    { id: 5, title: 'История Древней Руси', subject: 'История', grade: '6 класс', pages: 18, format: 'PDF', isFavorite: false },
    { id: 6, title: 'Present Perfect: упражнения и правила', subject: 'Английский', grade: '7 класс', pages: 7, format: 'PDF', isFavorite: true },
  ]);

  const toggleFavorite = (id: number) => {
    setAssignments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const filteredAssignments = assignments.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'favorites' && item.isFavorite);
    return matchesSearch && matchesTab;
  });

  const subjects = ['Все предметы', 'Математика', 'Физика', 'Химия', 'Литература', 'История', 'Английский'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ГДЗ Академия</h1>
                <p className="text-xs text-muted-foreground">Проверенные решения задач</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                Главная
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Поиск
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Избранное
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Аккаунт
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Надёжные решения домашних заданий
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Проверенные работы по всем школьным предметам с подробными объяснениями
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Поиск по предмету или теме задания..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base bg-white border-2 focus:border-accent"
              />
            </div>

            {/* Subject Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {subjects.map((subject) => (
                <Badge
                  key={subject}
                  variant="secondary"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2 text-sm"
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="mb-8 bg-secondary">
              <TabsTrigger value="all" className="data-[state=active]:bg-white">
                <Icon name="BookOpen" size={16} className="mr-2" />
                Все работы
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-white">
                <Icon name="Heart" size={16} className="mr-2" />
                Избранное ({assignments.filter(a => a.isFavorite).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="hover:shadow-lg transition-shadow border-2 hover:border-accent/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {assignment.subject}
                        </Badge>
                        <button
                          onClick={() => toggleFavorite(assignment.id)}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          <Icon
                            name="Heart"
                            size={20}
                            className={assignment.isFavorite ? 'fill-accent text-accent' : ''}
                          />
                        </button>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {assignment.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-xs">
                        <Icon name="GraduationCap" size={14} />
                        {assignment.grade}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Icon name="FileText" size={16} />
                          {assignment.pages} стр.
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="File" size={16} />
                          {assignment.format}
                        </span>
                      </div>
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Icon name="Download" size={16} className="mr-2" />
                        Скачать решение
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredAssignments.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ничего не найдено
                  </h3>
                  <p className="text-muted-foreground">
                    Попробуйте изменить параметры поиска
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-12 border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">1500+</div>
              <p className="text-muted-foreground">Готовых решений</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">15</div>
              <p className="text-muted-foreground">Школьных предметов</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <p className="text-muted-foreground">Точность решений</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="GraduationCap" size={24} />
              <span className="font-semibold">ГДЗ Академия</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              © 2024 Все права защищены. Образовательная платформа
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
