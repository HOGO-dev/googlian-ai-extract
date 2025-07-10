import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Upload, 
  FileText, 
  Download, 
  LogOut, 
  User, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BoletoUpload } from "@/components/BoletoUpload";
import { BoletoResults } from "@/components/BoletoResults";

interface BoletoData {
  id: string;
  tipo: string;
  numero: string;
  sacadoCnpj: string;
  vencimento: string;
  valorFace: string;
  nomeSacado: string;
  linhaDigitavel: string;
  processedAt: Date;
  status: 'processing' | 'completed' | 'error';
}

const Dashboard = () => {
  const [processedBoletos, setProcessedBoletos] = useState<BoletoData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const stats = [
    { 
      label: "Boletos Processados", 
      value: processedBoletos.length.toString(), 
      icon: <FileText className="h-5 w-5" />,
      color: "text-blue-600"
    },
    { 
      label: "Processando", 
      value: processedBoletos.filter(b => b.status === 'processing').length.toString(), 
      icon: <Clock className="h-5 w-5" />,
      color: "text-amber-600"
    },
    { 
      label: "Concluídos", 
      value: processedBoletos.filter(b => b.status === 'completed').length.toString(), 
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-600"
    },
    { 
      label: "Erros", 
      value: processedBoletos.filter(b => b.status === 'error').length.toString(), 
      icon: <AlertCircle className="h-5 w-5" />,
      color: "text-red-600"
    },
  ];

  const handleFileUpload = async (files: File[]) => {
    setIsProcessing(true);
    
    // Simulação do processamento
    for (const file of files) {
      const newBoleto: BoletoData = {
        id: Math.random().toString(36).substr(2, 9),
        tipo: "Cobrança",
        numero: Math.random().toString().substr(2, 10),
        sacadoCnpj: "12.345.678/0001-90",
        vencimento: "15/01/2025",
        valorFace: "R$ 1.250,00",
        nomeSacado: "Empresa Exemplo LTDA",
        linhaDigitavel: "34191.09008 61207.954112 95000.063305 8 95000000125000",
        processedAt: new Date(),
        status: 'processing'
      };

      setProcessedBoletos(prev => [...prev, newBoleto]);

      // Simular processamento assíncrono
      setTimeout(() => {
        setProcessedBoletos(prev => 
          prev.map(b => 
            b.id === newBoleto.id 
              ? { ...b, status: 'completed' as const }
              : b
          )
        );
      }, 2000 + Math.random() * 3000);
    }

    setIsProcessing(false);
    toast({
      title: "Upload realizado com sucesso!",
      description: `${files.length} arquivo(s) enviado(s) para processamento.`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                GOOGLIA
              </h1>
              <Badge variant="secondary" className="ml-2">
                Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo ao GOOGLIA</h2>
          <p className="text-muted-foreground">
            Processe seus boletos bancários com inteligência artificial de última geração.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Processar Boletos</span>
                </CardTitle>
                <CardDescription>
                  Faça upload de arquivos PDF ou imagens (JPEG/PNG) para extrair dados automaticamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BoletoUpload 
                  onFileUpload={handleFileUpload}
                  isProcessing={isProcessing}
                />
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Resultados Recentes</span>
                </CardTitle>
                <CardDescription>
                  Últimos boletos processados pela IA.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {processedBoletos.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum boleto processado ainda.</p>
                    <p className="text-sm">Faça upload de um arquivo para começar.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {processedBoletos.slice().reverse().map((boleto) => (
                      <div key={boleto.id} className="p-3 rounded border bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            Boleto #{boleto.numero}
                          </span>
                          <Badge 
                            variant={
                              boleto.status === 'completed' ? 'default' :
                              boleto.status === 'processing' ? 'secondary' : 
                              'destructive'
                            }
                          >
                            {boleto.status === 'completed' ? 'Concluído' :
                             boleto.status === 'processing' ? 'Processando...' :
                             'Erro'}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>Valor: {boleto.valorFace}</div>
                          <div>Vencimento: {boleto.vencimento}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Results */}
        {processedBoletos.filter(b => b.status === 'completed').length > 0 && (
          <div className="mt-8">
            <Separator className="mb-6" />
            <BoletoResults boletos={processedBoletos.filter(b => b.status === 'completed')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;